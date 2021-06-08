import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.get('store').findAll('tasks');
    },
    setupController: function(controller, model) {

        controller.set('model', model);
        controller.set('totalTasks', model.length);

        var completedTasks = model.reduce(function(n, task) {
            return n + task.completed;
        }, 0);

        controller.set('completedTasks', completedTasks);
        controller.set('toFinishTasks', model.length - completedTasks);


    }
});