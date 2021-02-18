# React `props-on-event`

> Apply props to _all_ children whenever a certain event occurs - just by listing it as a child.

 ```tsx
<OnEvent
    propsOnEvent={{
        style: {
            color: 'red',
        },
    }}
    events={[['onMouseOver', 'onMouseOut']]}
>
    <button
        style={{
            // Turns red on hover
            color: 'blue',
            // Is unaltered on hover
            backgroundColor: 'green',
        }}
    >
        Button 1
    </button>
    <span
        style={{
            // Turns red on hover
            color: 'green'
        }}
    >
        Button 2
    </span>
</OnEvent>
```

---

## Install

```console
 $ npm install props-on-event
```

```console
 $ yarn add props-on-event
```

## Usage

When passed only children, they are left unmodified:

```tsx
import { OnEvent } from './index';

<OnEvent>
    <div className='my-div'></div>
</OnEvent>

// -->

<div className='my-div'></div>
```

When passed a set of events, each (top-level) child begins listening for those events. However, nothing happens yet - until a set of `propsOnEvent` is specified.

```tsx
import { OnEvent } from './index';

<OnEvent
    // In the form of [trigger to turn on props, trigger to turn off props][]
    events={[['onMouseOver', 'onMouseOut'], ['onMouseEnter', 'onMouseLeave']]}
    propsOnEvent={{
        // Objects are merged - e.g.:
        // style: { 
        //      background-color: 'green', 
        //      color: 'blue', 
        // }
        // would in this case become:
        // {
        //      background-color: 'green',
        //      color: 'yellow',
        // }
        style: {
            color: 'yellow',
        },
        // string, number, boolean, and array types are simply overwritten
        className: 'new-div'
    }}
>
    // Class becomes 'new-div' on hover
    <div className='my-div'>
        
    </div>
</OnEvent>
```

 # Props

| Prop           	| Type                                  	| Default                                                	| Example                                                             	| Description                                                                                                          	|
|----------------	|---------------------------------------	|--------------------------------------------------------	|---------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------	|
| `children`     	| `ReactElement \| ReactElement[]`      	| Required                                               	| `<div />`                                                           	| The children onto which to apply the props (when active)                                                             	|
| `propsOnEvent` 	| `{ [key: string]: any } \| undefined` 	| `{}`                                                   	| `{ style: { color: 'red' } }`                                       	| The props to overwrite/merge with the existing props (when activated)                                                	|
| `events`       	| `[string, string][] \| undefined`     	| `[['onMouseOver', 'onMouseOut']]`                      	| `[['onMouseOver', 'onMouseOut'], ['onMouseEnter', 'onMouseLeave']]` 	| The events to trigger/disable the 'active' state props, in the form of `[trigger to turn on, trigger to turn off][]` 	|
| `className`    	| `string \| undefined`                 	| `<></>` (no wrapper, children returned as-is)          	| `'wrapperClass'`                                                    	| The `className` of the wrapper element                                                                               	|
| `component`    	| `ReactElement \| undefined`           	| none if `className === undefined`, `<div />` otherwise 	| `<span />`                                                          	| The wrapper element within which to contain the children                                                             	|
