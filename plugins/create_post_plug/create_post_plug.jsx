// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable react/no-multi-comp */

import PropTypes from 'prop-types';
import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {RootCloseWrapper} from 'react-overlays';

import HeaderIconWrapper from 'components/channel_header/components/header_icon_wrapper';

class CreatePostPlug extends React.PureComponent {
    static propTypes = {
        open: PropTypes.bool,
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
        rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),
    }

    handleRootClose = () => {
        this.props.onClose();
    }

    render() {
        const {
            open,
            rootCloseEvent,
            children,
        } = this.props;

        return (
            <RootCloseWrapper
                disabled={!open}
                onRootClose={this.handleRootClose}
                event={rootCloseEvent}
            >
                <ul
                    role='menu'
                    className='dropdown-menu channel-header_plugin-dropdown'
                >
                    {children}
                </ul>
            </RootCloseWrapper>
        );
    }
}

class CustomToggle extends React.PureComponent {
    static propTypes = {
        children: PropTypes.element,
        dropdownOpen: PropTypes.bool,
        onClick: PropTypes.func,
    }

    handleClick = (e) => {
        this.props.onClick(e);
    }

    render() {
        const {children} = this.props;

        let activeClass = '';
        if (this.props.dropdownOpen) {
            activeClass = ' active';
        }

        return (
            <button
                id='pluginChannelHeaderButtonDropdown'
                className={'channel-header__icon style--none' + activeClass}
                type='button'
                onClick={this.handleClick}
            >
                {children}
            </button>
        );
    }
}

export default class ChannelHeaderPlug extends React.PureComponent {
    static propTypes = {

        /*
         * Components or actions to add as channel header buttons
         */
        components: PropTypes.array,

        channel: PropTypes.object.isRequired,
        channelMember: PropTypes.object.isRequired,

        /*
         * Logged in user's theme
         */
        theme: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggleDropdown = (dropdownOpen) => {
        this.setState({dropdownOpen});
    }

    onClose = () => {
        this.toggleDropdown(false);
    }

    fireActionAndClose = (action) => {
        action(this.props.channel, this.props.channelMember);
        this.onClose();
    }

    createDropdown = (plugs) => {
        const items = plugs.map((plug) => {
            return (
                <li
                    key={'CreatePostPlug' + plug.id}
                >
                    <a
                        href='#'
                        className='overflow--ellipsis'
                        onClick={() => this.fireActionAndClose(plug.action)}
                    >
                        <span>{plug.icon}</span>
                        {plug.dropdownText}
                    </a>
                </li>
            );
        });

        return (
            <div className="create_post--plug">
                <div className='flex-child'>
                    <Dropdown
                        ref='dropdown'
                        id='CreatePostPlug'
                        onToggle={this.toggleDropdown}
                        onSelect={this.onSelect}
                        open={this.state.dropdownOpen}
                    >
                        <CustomToggle
                            dropdownOpen={this.state.dropdownOpen}
                            bsRole='toggle'
                        >
                            <span className='fa fa-plus'/>
                        </CustomToggle>
                        <CreatePostPlug
                            bsRole='menu'
                            open={this.state.dropdownOpen}
                            onClose={this.onClose}
                        >
                            {items}
                        </CreatePostPlug>
                    </Dropdown>
                </div>
            </div>
        );
    }

    render() {
        const components = this.props.components || [];

        if (components.length === 0) {
            return null;
        }

        return this.createDropdown(components);
    }
}

/* eslint-enable react/no-multi-comp */
