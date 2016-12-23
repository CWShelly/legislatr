var React = require('react');
var ReactDOM = require('react-dom')


var items =[]

// var senData = {
//     id: 5,
//     name: 'John McCain',
//     state: 'Arizona',
//     party: 'Republican',
//     since: 1987
// }

var GetSen = React.createClass({

    present: function(){
    var request = new XMLHttpRequest();
    request.open('GET', '/api/us_senators', false)
    request.send(null)
    if(request.status == 200){
        console.log(request.responseText);
        var parsed = JSON.parse(request.responseText);
        for(var i = 0; i<parsed.length; i++){
            items.push(parsed[i])
        }
    }
    },



	getInitialState: function() {
		return { items: [] }
	},
	render: function() {
          this.present()
		var listItems = this.props.items.map(function(item) {
			return (
				<li key={item.name}>


                   {item.name} {item.state}
				</li>
			);
		});

		return (
			<div className='pure-menu'>


				<ol>
					{listItems}
				</ol>
			</div>
		);
	}
});






var CreateSen = React.createClass({

    v: function(f){
        console.log('experimenting');
        console.log(f);
    },

    x: 'aaefaefs',

        create: function(event){
            console.log(event);
            console.log('yes');
            event.preventDefault()


            var senData ={
         id: JSON.parse(event.target.children['id'].value),
         name: event.target.children['name'].value,
         state: event.target.children['state'].value,
         party: event.target.children['party'].value,
         since: JSON.parse(event.target.children['since'].value)
     };

     var xData = $('form').serialize();
     console.log(xData);

    console.log('sen data is ');
     console.log(senData);
     console.log(senData.name);


     $.post('/api/us_senators', xData, function(data){
         console.log('posting');
         console.log(senData);
         console.log(data);
         document.location.reload(true)
     })

        },

        render: function(){
            return (
                <form onSubmit = {this.create}>
                <input type = "text" name ="id" placeholder = "id" />
                <input type = "text" name ="name" placeholder = "name" />
                <input type = "text" name ="state" placeholder = "state" />
                <input type = "text" name ="party" placeholder = "party" />
                <input type = "text" name ="since" placeholder = "since" />
                <button type = "submit"> {this.x}</button>
            </form>




            )

        }
});


ReactDOM.render(<GetSen items={items} />,
	document.getElementById('app'));

    ReactDOM.render(<CreateSen />,
    	document.getElementById('app2'));
