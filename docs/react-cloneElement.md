An example:

main render function of a component such as App.js:
```jsx
render() {   
    return(
            <Paragraph>
              <Sentence>First</Sentence>
              <Sentence>Second</Sentence>
              <Sentence>Third</Sentence>
            </Paragraph>   
    ) 
}
```
now let's say you need to add an onClick to each child of Paragraph; so in your Paragraph.js you can do:
```jsx
render() {
        return (
          <div>
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              onClick: this.props.onClick })   
         })}
         </div>
       ) 
}
```
then simply you can do this:
```jsx
render() {   
  return(
        <Paragraph onClick={this.onClick}>
          <Sentence>First</Sentence>
          <Sentence>Second</Sentence>
          <Sentence>Third</Sentence>
        </Paragraph>   
   ) 
}
```
Note: the React.Children.map function will only see the top level elements, it does not see any of the things that those elements render; meaning that you are providing the direct props to children (here the <Sentence /> elements). `If you need the props to be passed down further`, let's say you will have a <div></div> inside one of the <Sentence /> elements that wants to use the onClick prop then in that case you can use the Context API to do it. Make the Paragraph the `provider` and the Sentence elements as `consumer`.