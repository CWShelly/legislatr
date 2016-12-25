var React = require('react');
var ReactDOM = require('react-dom')

// var url = "https://api.propublica.org/congress/v1/114/house/members.json"


 var url = "https://api.propublica.org/congress/v1/members/new.json"

var items =[];




var GetList = React.createClass({
    getStuff: function(){
        console.log('getting stuff');

    // $.getJSON(url, null, function(data){
    //     console.log('je hais noel');
    //     console.log(data);
    // })

        $.ajax({
           type: 'GET',
            url:  url,
            contentType: "application/json",
            crossDomain: true,
            beforeSend : function( xhr ) {



       xhr.setRequestHeader("X-API-Key", myKey)

   },
           headers: {
                "content-Type": "application/json",

           },

            xhrFields: {
                withCredentials: false
            },

            success: function(data){
                console.log('success here');
                console.log(data);
            },
            error: function(req,res){
                console.log(res);
                console.log('no success');
            }

        })

        .fail((req, res)=>{
            console.log('x');
            console.log(req);

        })
        .then((x, y, z)=>{
    
            // console.log(config);
            console.log(x, y, z);
            console.log(z.responseText);
        })


    },
    render: function(){
        return(
            <div>
            <p>{this.getStuff()}</p>
            <p>text here</p>
            </div>
        )
    }

})

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
ReactDOM.render(<GetList />, document.getElementById('app3'))
