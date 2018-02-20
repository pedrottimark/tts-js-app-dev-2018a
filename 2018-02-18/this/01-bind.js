var teacher = {
	name: 'Shane',
	unboundFunction: function (){
			console.log('later my name is ' + this.name);
		},
	speak: function() {
		//Bind a function to a specific context
		var boundFunction = this.unboundFunction.bind(this);
		
		//boundFunction will always run in bound context
		setTimeout(boundFunction,1000);
	}
}

teacher.speak();