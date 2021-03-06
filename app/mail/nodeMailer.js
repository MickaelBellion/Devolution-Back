const nodemailer = require("nodemailer");

module.exports={

    createTransport: async () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'devolutionoclock@gmail.com',
          pass: 'devolution75!',
        },
      })
      return await transporter;
    },

    createOptionMail: async (email) => {
      const mailOptions = {
        from: '"devolutionoclock@gmail.com', 
        to: email, 
        subject: "Inscription confirmée", 
        text: `Votre inscription est bien prise en compte`,
        html: "<body><h2>Bienvenue sur Dévolution</h2><p>Merci de participer à l'aventure Dévolution, désormais vous pourrez proposer vos projets à construire à l'aide de nos différents collaborateurs. </p><br><p>Il vous sera aussi possible de participer aux projets proposés par d'autres utilisateurs à conditions que ces derniers confirment votre sélection.</p><br><em>Tout débordements dans les noms de projets , de user ou dans les descriptions seront sanctionné par nos modérateurs </em><br><h4>Comment ça marche?</h4><br><h5>Je suis un développeur</h5><br><p>Vous voilà parmis nous , commencez par créer votre profil puis si vous n'avez pas encore chercher les projets qui pourraient vous plaire faites une petite recherche par compétences ou par nom afin de trouver un projet qui vous correspond et auquel vous souhaiteriez participer. Une fois le projet choisi , soumettez votre candidature au créateur du projet. Pas de panique ! ici ni entretien ni test techniques, vous êtes dans un premier temps intégrer d'office dans l'équipe du projet. Libre au créateur du projet de vous acceptez ou non par la suite (un petit mail sympa au créateur de projet ,détaillant votre motivation vous aidera grandement... mais on a rien dit)</p><br><h5>Je veux créer mon projet</h5><br><p>Renseignez un maximum d'informations sur vos besoins et attentes de votre projet,le but de votre futur site? quelles technologies utilisés? la date de début ? enfin bref , plus il y'a d'informations plus les utilisateurs sauront ou ils mettent les pieds. Soigner la présentation de son projet qui a un but clair ,précis et qui peut être un challenge a relever plaira à notre communauté, alors faites ce qu'il faut pour rendre Votre projet attrayant au possible</p><h6>Bonne chance pour vos futurs projets et toute l'équipe vous souhaite la réussite </h6></body>", // html body
      };
      return await mailOptions
    },

    sendEmail: async (transporter, mailOptions) => {
    
      transporter.sendMail(mailOptions, function (error,info){
        if (error){
            return console.log(error)
        }else {
            return console.log('Email sent : ' + info.response);
        }
    })
  },


}


