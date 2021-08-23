const { Extension, type, api } = require('clipcc-extension');

class HelloExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: '%[id].category',
            messageId: '%[id].category',
            color: '#66CCFF'
        });
        api.addBlock({
            opcode: '%[id].hello',
            type: type.BlockType.REPORTER,
            messageId: '%[id].hello',
            categoryId: '%[id].category',
            function: () => "Hello, ClipCC!"
        });
    }
}

module.exports = HelloExtension;
