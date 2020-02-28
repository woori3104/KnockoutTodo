
class Task {
    constructor(id, name , dueDate, status, reportingDate, lastDate, bstatus) {
        let self = this;

        self = this;
        self.taskId = ko.observable(id);
        self.taskName = ko.observable(name);
        self.taskDueDate = ko.observable(dueDate);
        self.taskStatus = ko.observable(status);
        self.taskReportingDate = ko.observable(reportingDate);
        self.taskLastDate = ko.observable(lastDate);
        self.completed = ko.observable(bstatus)
    }
}


var getCurrentDate = function() {
    const date = new Date();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const currentDate = `${date.getFullYear()}-${month<10 ? `0${month}`:month}-${day<10 ? `0${day}`:day}`;
    return currentDate;
}

var TodoViewModel = function(){
 
    let self = this;

    self.inputTask = ko.observable("");
    self.inputDueDate = ko.observable("");
    self.showVisible=ko.observable(false);
    self.editTask = ko.observable();
    self.todoList = ko.observableArray(
        [
            { task:
                new Task
                ("#"+Math.random().toString(36).substr(2,4), "task1","2020-03-06","completed",getCurrentDate(),getCurrentDate(),true)
            },
            { task:
                new Task
                ("#"+Math.random().toString(36).substr(2,4), "task2","2020-03-06","created",getCurrentDate(),getCurrentDate(),false)
            },
            { task:
                new Task
                ("#"+Math.random().toString(36).substr(2,4), "task3","2020-03-06","inProgress",getCurrentDate(),getCurrentDate(),false)
            }        
        ]
 
    ); 

    
    //input New Task
    self.submitNewTask = function() {
        if( !self.inputTask() ) {
            alert("Input your Task");
            return;
        }
            
        let taskId = "#"+Math.random().toString(36).substr(2,4);
        let dueDate = self.inputDueDate() ;
        if (self.inputDueDate() === "") {
            dueDate = getCurrentDate();
        }
        self.todoList.push( {task:
            new Task(taskId,  self.inputTask(), dueDate,"created",getCurrentDate(), getCurrentDate
        (),false)});
        self.inputTask('');
        self.inputDueDate('');
        
    };

    
    self.showEditTask = function() {

        self.showVisible(true);
        self.editTask (this);
    };
    
    // Task Delete
    self.removeTask = function()
    {
        self.todoList.remove(this);
        self.showVisible(false);
    };


     // Task Update
     self.updateTask = function () {

        self.editTask().task.taskLastDate(getCurrentDate());
        if (self.editTask().task.taskStatus() === "completed")
            self.editTask().task.completed(true);
        else   
            self.editTask().task.completed(false);
        self.editTask('');
        self.showVisible(false);
    };

}
ko.applyBindings(new TodoViewModel()); 
