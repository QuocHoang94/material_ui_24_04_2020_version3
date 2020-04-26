import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from "./styles";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { STATUS } from '../../constants';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from './../../actions/task';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
// const listTask = [
//     { id: 1, title: "Readboook", description: "Read material book", status: 0 },
//     { id: 2, title: "Watching movie", description: "on NetFlix", status: 2 },
//     { id: 3, title: "Playing Game", description: "PS4", status: 1 }
// ]
class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        const { taskActionCreators } = this.props;
        const { fetchListTaskRequest } = taskActionCreators;
        fetchListTaskRequest();
    }
    renderBoard = () => {
        const { listTask } = this.props;
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {
                    STATUS.map((status, index) => {
                        const taskFilter = listTask.filter(task => task.status === status.value)
                        return <TaskList key={status.value} task={taskFilter} status={status} />

                    })
                }
            </Grid>
        );
        return xhtml;
    }
    renderForm = () => {
        let xhtml = null;
        xhtml = (
            <TaskForm />
        )
        return xhtml;
    }
    showToast = () => {
        toast.error('Thanh cong nha nha')
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.taskboard}>
                <Button variant="contained" color="primary" className={classes.button}>
                    <AddIcon /> Them moi cong viec
                </Button>
                {/* <Box ml={1}><Button variant="contained" color="primary" onClick={() => this.showToast()}>showToast</Button></Box> */}
                {this.renderBoard()}
                {this.renderForm()}
            </div>
        )
    }
}
TaskBoard.propTypes = {
    taskActionCreators: PropTypes.shape({
        fetchListTaskRequest: PropTypes.func,
    }),
    listTask: PropTypes.array
}
const mapStateToProps = state => {
    return {
        listTask: state.task.listTask
    }
};
const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch)
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));