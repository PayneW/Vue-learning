/* @flow */


// - `src/shared/util.js`
import {makeMap} from 'shared/util';

// - these are reserved for web beacuse they are directly compiled away
//   during template compilation. 
//   (这些是为 web 保留的, 因为它们是在模板编译期间直接编译的.)
export const isReseredAttr = makeMap('style,class');

// - attributes that should be using props for binding.
//   (应该使用 `props` 进行绑定的属性.)
const acceptValue = makeMap('input,textarea,option,select,progress');
export const mustUseProp = (tag: string, type: ?string, attr: string): boolean => {
    return(
        (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
        (attr === 'selected' && tag === 'option') ||
        (attr === 'checked' && tag === 'input') ||
        (attr === 'muted' && tag === 'video')
    )
};

// - is enumerated attr (是可枚举属性)
export const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

export const isBooleanAttr = makemap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 
    'required,reversed,scoped,seamless,selected,sortable,translate,' + 
    'truespeed,typemustmatch,visible'
);

export const xlinkNS = 'http://www.w3.org/1999/xlink';

export const isXlink = (name: string): boolean => {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

export const getXlinkProp = (name: string): string => {
    return isXlink(name) ? name.slice(6, name.length) : '';
};

export const isFalsyAttrValue = (val: any): boolean => {
    return val == null || val === false;
}
