var teacher = {
	name: 'Shane',
	speak: function() {
		
		//Save this to a variable
		var self = this;
		
		//self is visible inside function because of closure
		setTimeout(function(){
			console.log('later my name is ' + self.name);
		},1000);
	}
}

teacher.speak();