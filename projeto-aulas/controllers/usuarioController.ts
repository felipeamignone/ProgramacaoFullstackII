import UsuarioModel from "../models/usuarioModel.ts";

export default class UsuarioController {
  listar(_, res) {
    try {
      let usuario = new UsuarioModel();
      let lista = usuario.listar();

      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  gravar(req, res) {
    try {
      const { id, nome, email, cidade, estado } = req.body;

      if (id && nome && email && cidade && estado) {
        let usuario = new UsuarioModel();
        usuario.gravar({ id, nome, email, cidade, estado });

        res.status(200).json({ msg: "Usuário criado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }

  deletar(req, res) {
    try {
      const { id } = req.params;

      if (id) {
        let usuario = new UsuarioModel();
        usuario.deletar(id);

        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
        return;
      }

      res.status(400).json({ msg: "Dados inválidos" });
    } catch (error) {
      res.status(500).json({
        msg: "Não foi possível concluir a requisição, tente novamente mais tarde",
      });
    }
  }
}
