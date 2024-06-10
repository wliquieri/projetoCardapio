import { cadastrarCategoria, encontrarCategoria, encontrarCategoriaId, atualizarCategoria, deletarCategoria, listarCategorias, contarCategorias } from "../db/categoriasDb.js";

function registrarEventoCategoria(socket, io) {
    socket.on("cadastrar_categoria", async ({ nome, usuario }) => {
        const categoria = await encontrarCategoria({ nome, usuario });

        if (categoria === null) {
            const qdRegistros = await contarCategorias({ usuario });
            const resultado = await cadastrarCategoria({ nome, usuario, ativo: true, posicao: qdRegistros + 1 });

            if (resultado.acknowledged) {
                socket.emit("cadastro_categoria_sucesso");
            } else {
                socket.emit("cadastro_categoria_erro");
            }
        } else {
            socket.emit("categoria_ja_existente",{nome});
        }
    })

    socket.on("listar_categorias", async ({ usuario }) => {
        const categorias = await listarCategorias({ usuario });
        socket.emit("listar_categorias_sucesso", categorias);
    })

    socket.on("editar_categoria", async ({ _id, nome, ativo }) => {
        const categoria = await encontrarCategoriaId({ _id });
        if (categoria !== null) {
            const resultado = await atualizarCategoria({ _id, nome, ativo });
            if (resultado.acknowledged) {
                socket.emit("editar_categoria_sucesso");
            } else {
                socket.emit("editar_categoria_erro");
            }
        } else {
            socket.emit("editar_categoria_nao_encontrada");
        }
    })
}

export default registrarEventoCategoria;