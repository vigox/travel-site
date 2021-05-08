const path = require('path')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
]

module.exports = {
    // Origen de archivo js a empaquetar
    entry: './app/assets/scripts/App.js',
    
    // Destino de archivos empaquetedos
    output: {
        filename: 'bundled.js',
        // webpack requires an absolute path
        // The path package from NodeJS is required
        path: path.resolve(__dirname, 'app')
    },
    // Usar el paquete de servidor de WebPack
    devServer:{
        before: function(app, server) {
            // vigilar cualquier archivo terminado en html
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        // hot inyecta CSS y JS al vuelo
        hot: true,
        port: 9001,
        // Para sincronizar en móvil
        // El valor permite que dispositivos en la misma red puedan conectarse
        host: '0.0.0.0'
    },
    
    // Definir modo de desarrollo para el proyecto con WebPack
    mode: 'development',
    
    // Establecer que se ejecute en cambios
    // watch: true,
    // watch es innecesario y redundante con devServer
    
    // Agregar modulos para expandir las funciones de webpack
    module: {
        rules: [
            // Aquí se definen los tipos de archivos que soportará
            // Se usan expresiones regulares
            {
                // Que extensión de archivo probar
                test: /\.css$/i,
                // Que se hará con dicha(s) extensión(es)
                use: [
                    'style-loader',
                    'css-loader',
                    // PostCSS requiere definir sus funciones
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // Se le pasa un arreglo
                                // Se define como variable
                                plugins: postCSSPlugins
                            }
                        }
                    }
                ]
            }
        ]
    }
}
