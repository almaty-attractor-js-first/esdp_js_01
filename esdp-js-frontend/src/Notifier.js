/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from './store/actions/notificationsActions';

class Notifier extends React.Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };

    shouldComponentUpdate({ notifications: newSnacks = [] }) {
        if (!newSnacks.length) {
            this.displayed = [];
            return false;
        }

        const { notifications: currentSnacks } = this.props;
        let notExists = false;
        for (let i = 0; i < newSnacks.length; i += 1) {
            const newSnack = newSnacks[i];
            if (newSnack.dismissed) {
                this.props.closeSnackbar(newSnack.key);
                this.props.removeSnackbar(newSnack.key);
            }

            if (notExists) continue;
            notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length;
        }
        return notExists;
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach(({ key, message, options = {} }) => {
            if (this.displayed.includes(key)) return;
            this.props.enqueueSnackbar(message, {
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                    this.props.removeSnackbar(key);
                }
            });
            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications.notifications,
    loginError: state.users.loginError
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier));
