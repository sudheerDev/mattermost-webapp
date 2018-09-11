// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';

import PostAttachmentOpenGraph from './post_attachment_opengraph.jsx';

function mapStateToProps(state) {
    return {
        currentUser: getCurrentUser(state),
    };
}

export default connect(mapStateToProps)(PostAttachmentOpenGraph);
