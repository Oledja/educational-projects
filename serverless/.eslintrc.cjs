module.exports = {
    
    "extends": [
        "airbnb-typescript/base",
        "prettier",
    ],
    "plugins": [
        "prettier",
        "import"
    ],
    "ignorePatterns": '.eslintrc.cjs',
    "parserOptions": {
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname,
        "sourceType": 'module'
    },
    "rules": {
        "prettier/prettier": "error",
        "no-unused-vars": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "cjs": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never",
                "": "never"
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "error"
        ],
        "import/order": "off",
        "no-underscore-dangle": [
            "error",
            {
                "allow": [
                    "_id"
                ]
            }
        ],
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true
            }
        ],
        "import/no-cycle": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "max-len": [
            "error",
            {
                "code": 150,
                "tabWidth": 2,
                "ignoreRegExpLiterals": true
            }
        ]
    }
}