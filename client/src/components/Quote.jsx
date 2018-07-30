import React from 'react';
class Quote extends React.Component{

render(){
  return <div style={{
    'textAlign': 'center', display: 'inline-block', float:'center', marginLeft:'50px', marginRight:'50px'}}>
    <div dangerouslySetInnerHTML={{ __html:this.props.quote}} style={{'marginBottom':'5px'}} />
      <div style={{ backgroundRepeat: "no-repeat",  width: "200px", height: "200px", backgroundSize: "contain", margin: "auto", "backgroundImage": this.props.image }} />
    </div>;
}
  
  
};
export default Quote;