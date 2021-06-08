import Ember from 'ember';

export default Ember.Controller.extend({
    updateTasksState: function (state) {
        if (state == 'add') {
            this.set('totalTasks', this.totalTasks + 1);
            this.set('toFinishTasks', this.toFinishTasks + 1);

        } else if (state == 'checked') {
            this.set('completedTasks', this.completedTasks + 1);
            this.set('toFinishTasks', this.toFinishTasks - 1);

        } else if (state == 'unchecked') {
            this.set('completedTasks', this.completedTasks - 1);
            this.set('toFinishTasks', this.toFinishTasks + 1);
        }
    },

    actions: {

        createTask() {
            this.send('editTask', this.model.length);
            var task;
            task = this.store.createRecord('tasks', {
                name: 'some text',
                completed: 0
            });
            this.updateTasksState('add');
        },

        updateTask(task) {
            this.set('isEditing', false);
            task.save();
        },

        updateStatus(id, isChecked) {
            if (isChecked) {
                this.updateTasksState('checked');
            } else {
                this.updateTasksState('unchecked');
            }
            this.store.find('tasks', id).then((task) => {
                task.completed = isChecked;
                task.save();
            }).then(() => { });
        },

        deleteTask(id) {
            this.toggleProperty('isEditing');

            let post = this.store.peekRecord('tasks', id);
            post.destroyRecord();;
        },

        editTask(i) {
            this.set('isEditing', i);
        },

        toggleEditing: function () {
            this.toggleProperty('isEditing');
        },


    }
});

