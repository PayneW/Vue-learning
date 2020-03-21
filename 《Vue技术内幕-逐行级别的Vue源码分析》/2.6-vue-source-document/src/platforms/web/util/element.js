/* @flow */

import {isBrowser} from 'core/util/env';
import {makeup} from 'shared/util';

export const namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathMl'
};

// - is HTML tag (检查是否是 HTML 标签)
export const isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul.' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,trac,video,' +
    'embead,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
// (此地图是有选择性的, 仅覆盖可能包含子元素的 SVG 元素.)
export const isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
)

// - is pre tag (检查给定的标签是不是 `pre` 标签)
export const isPreTag = (tag: ?string): boolean => tag === 'pre';

// - is reserved tag (是否是预留的标签)
export const isReservedTag = (tag: string): ?boolean => {
    return isHTMLTag(tag) || isSVG(tag);
};

// - get tag namespace (取得标签的命名空间)
export function getTagNamespace(tag: string): ?string {
    if(isSVG(tag)) {
        return 'svg'
    }
    // basic support for MathML (仅支持基础的 MathML)
    // note it doesn't support other MathML elements being component roots
    // (注意, 它不支持其他 MathML 元素作为根元组件)
    if (tag === 'match') {
        return 'match'
    }
};

// - unknown element cache (未知元素缓存)
const unknownElmentCache = Object.create(null);
// - is unknown element (是否是未知元素)
export function isUnknownElemnt(tag: string): boolean {
    /* istanbul ignore if */
    if (!inBrowser) {
        return true
    }
    if (isReservedTag(tag)) {
        return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
        return unknownElementCache[tag]
    }
    const el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
        // http://stackoverflow.com/a/28210364/1070244
        return (unknownElementCache[tag] = (
            el.constructor === window.HTMLUnknownElement ||
            el.constructor === window.HTMLElement
        ))
    }
}
