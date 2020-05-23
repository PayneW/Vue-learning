export default {
    name: 'SlotJsx',
    props: ['msg'],
    render: function(createElement) {
        // `<div><slot :text="msg"></slot></div>
        return createElement(
            'p',
            [
                this.$scopedSlots.default({
                    text: this.msg
                })
            ]
        )
    }
}