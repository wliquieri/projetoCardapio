import {atualizaProduto, cadastrarProduto, encontraProduto, encontraProdutoId, listarProdutos } from "../db/produtoDb.js";

function registrarEventosProduto(socket, io) {
    socket.on("cadastrar_produto", async ({ usuario, categoria, nome, descricao, valor, imagem, destaque, ativo }) =>{
        const produto = await encontraProduto({usuario, nome});
        console.log(produto)
        if(produto === null ){
            const resultado = await cadastrarProduto({usuario, categoria, nome, descricao, valor, imagem, destaque, ativo}) 
            if (resultado.acknowledged){
                socket.emit("cadastro_produto_sucesso")
            }else{
                socket.emit("cadastro_produto_erro")
            }
        }else{
            socket.emit("produto_ja_existente",{categoria, nome});
        }
        //console.log({ usuario, categoria, nome, descricao, valor, imagem, destaque, ativo })
        //console.log("{usuario, categoria, nome, descricao, valor, image, destaque, ativo}")
    })

    socket.on("listar_produtos", async({usuario}) =>{
        console.log({usuario});
        const produtos = await listarProdutos({usuario});
        socket.emit("listar_produtos_sucesso", produtos);
    
    })
    socket.on("editar_produto", async({_id, nome ,categoria , descricao, valor, ativo}) =>{
        const produto = await encontraProdutoId({_id});

        if(produto !== null){
            const resultato = await atualizaProduto({_id, nome ,categoria , descricao, valor, ativo});
            if(resultato.acknowledged){
                socket.emit("editar_produto_sucesso");
            }else{
                socket.emit("editar_produto_erro");
            }
        }else{
            socket.emit("produto_nao_encontrado");
        }
        //console.log)

    
    })
}

export default registrarEventosProduto;