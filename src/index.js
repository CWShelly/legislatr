var React = require('react');
var ReactDOM = require('react-dom')

var items =[]

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


				<ul>
					{listItems}
				</ul>
			</div>
		);
	}
});


ReactDOM.render(<GetSen items={items} />,
	document.getElementById('app'));
