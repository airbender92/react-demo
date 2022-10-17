import { isValidElementType } from 'react-is'

export default (props: { [x: string]: any }, propName: string | number, componentName: any) => {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'`
    )
  }

}