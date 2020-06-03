var getChildrenTextContent = function(children) {
    return children.map(function(node) {
        return node.children
            ? getChildrenTextContent(node.children)
            : node.text
    }).join('')
}


export default {
    name: 'AnchoredHeading',
    render: function(createElement) {
        // - 创建 kebab-case 风格的 ID
        // - `\W` 匹配除了字母, 数字, 下划线之外的字符.
        var headingId = getChildrenTextContent(this.$slots.default)
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^-|-$)/g, '');

        return createElement(
            'h' + this.level,
            {
                style: {
                    color: '#232323'
                }
            },
            [
                createElement(
                    'a', 
                    {
                        style: {
                            color: '#0366d6'
                        },
                        attrs: {
                            name: headingId,
                            href: '#' + headingId
                        }
                    }, 
                    this.$slots.default
                )
            ]
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
}