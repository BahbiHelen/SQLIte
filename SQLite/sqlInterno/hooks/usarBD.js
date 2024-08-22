import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('produtos.db');

export function usarBD() {
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS produtos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    quantidade INTEGER NOT NULL
                );`
            );
        });
    }, []);

    const create = (produto) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO produtos (nome, quantidade) VALUES (?, ?);',
                    [produto.nome, produto.quantidade],
                    (_, { insertId }) => resolve({ ...produto, idProduto: insertId }),
                    (_, error) => reject(error)
                );
            });
        });
    };

    const read = (pesquisa) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM produtos WHERE nome LIKE ?;',
                    [`%${pesquisa}%`],
                    (_, { rows: { _array } }) => resolve(_array),
                    (_, error) => reject(error)
                );
            });
        });
    };

    const update = (produto) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE produtos SET nome = ?, quantidade = ? WHERE id = ?;',
                    [produto.nome, produto.quantidade, produto.id],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
    };

    const remove = (id) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM produtos WHERE id = ?;',
                    [id],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
    };

    return { create, read, update, remove };
}

export function usarBD() {
    const bd = useSQLiteContext();
}

    async function create(dados) {
        const regras = await bd.prepareAsync(
            "INSERT INTO produtos (nome, quantidade) VALUES ($nome, $quantidade)"
        );
        try {
            const result = await regras.executeAsync({
                $nome: dados.nome,
                $quantidade: dados.quantidade,
            });

            const idProduto = result.lastInsertRowId.toLocaleString();

            return { idProduto };
        } catch (error) {
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
        async function read(nome) {
            try {
                const consulta = "SELECT * FROM produtos WHERE nome LIKE ?";
                const resposta = await bd.getAllAsync(consulta, `%${nome}%`);
                return resposta;
            } catch (error) {
                throw error;
            }
        }
    async function remove(id) {
        try {
            await bd.execAsync("DELETE FROM produtos WHERE id = " + id);
        } catch (error) {
            throw error;
        }
    }
    return { create, read, remove }
}