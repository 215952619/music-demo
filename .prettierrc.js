module.exports = {
    semi: false, // 行位是否使用分号
    printWidth: 200, // 一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, // 一个tab代表几个空格数，默认为80
    useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
    trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, // 对象空格 { foo: bar }, false=> {foo:bar}，对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    jsxBracketSameLine: false, // jsx闭标签是否另起一行 <Test></Test>
    arrowParens: 'avoid', // 箭头函数是否省略括号 a=> a, (a)=> a
    singleQuote: true // 单引号
}
