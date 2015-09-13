import React from "react";

let About = React.createClass({
  componentDidMount: function() {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/',
      dataType: 'json',
      success(data) {
        console.log(data);
      },
      error() {
        console.log('no bueno')
      }
    })
  },
render() {
  return (
    <div className="about">
      <h1>This is the About route</h1>
    </div>
  );
},
});

export default About;