// - ../src/core/global-api/assets.js  (全部代码)

import {ASSET_TYPES} from 'shared/constants';                   // {8-1}
import {isPlainObject, validateComponentName} from '../util/index'; // {8-2}

export function initAssetRegisters(Vue: GlobalAPI) {            // {8-3}
    // - Create asset registration methods. (创建资产注册方法)
    ASSET_TYPES.forEach(type => {                               // {8-4}
        Vue[type] = function(                                   // {8-5}
            id: string,
            defination: Function | Object
        ): Function | Object | void {
            if (!definition) {                                  // {8-6}
                return this.options[type + 's'][id];            // {8-7}
            } else {
                // - istanbul ignore if 
                if (process.env.NODE_ENV !== 'production'
                    && type === 'component') {                  // {8-8}
                    validateComponentName(id);                  // {8-9}
                }
                if (type === 'component' 
                    && isPlainObject(definition)) {             // {8-10}
                    definition.name = definition.name || id;    // {8-11}
                    definition = this.options._base.extend(definition); // {8-12}
                }
                if (type === 'directive'
                    && typeof definition === 'function') {      // {8-13}
                    definition = {bind: defintion, update: definition}; // {8-14}
                }
                this.options[type + 's'][id] = definitoin;      // {8-15}
                return definition;
            }
        }
    })
}