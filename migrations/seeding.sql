BEGIN;
-- INSERT LES DONNEES DANS L'ORDRE TABLE PAR TABLE SINON tout est CASSER

INSERT INTO "role" ("label")
VALUES 
('User'),
('Admin');

INSERT INTO "user" ("email","password","pseudo","image_url","user_status","user_function","lastname","firstname","phone","city","experience","role_id") VALUES 
('AmauryD@gmail.com','tardis','AmauryD','https://www.thispersondoesnotexist.com/','Disponible','Développeur web','D','Amaury','0611223344','Toulouse','Développeur en devenir chez OClock ',1),
('AnthonyF@gmail.com','tardis','AnthonyF','https://www.thispersondoesnotexist.com/','Non disponible','Développeur web','F','Anthony','0655448877','Marseille','Développeur en devenir chez OClock ',1),
('AnthonyL@gmail.com','tardis','AnthonyL','https://www.thispersondoesnotexist.com/','Bientôt disponible','Développeur web','L','Anthony','0666553322','Marseille','Développeur en devenir chez OClock',1),
('ArnaudD@gmail.com','tardis',' ArnaudD','https://www.thispersondoesnotexist.com/','Disponible','Développeur web','D','Arnaud','0101011256','Bordeaux','Développeur en devenir chez OClock ',1),
('ArnaudF@gmail.com','tardis','ArnaudF','https://www.thispersondoesnotexist.com/','Bientôt disponible','Développeur web','F','Arnaud','012345678','Paris','Développeur en devenir chez OClock ',1),
('LeaB@gmail.com','tardis','LéaB','https://www.thispersondoesnotexist.com/','Disponible','Développeur web','B','Léa','0825512512','Paris','Développeur en devenir chez OClock ',1),
('BaptisteC@gmail.com','tardis','BaptisteC','https://www.thispersondoesnotexist.com/','Non disponible','Développeur web','C','Baptiste','0305040609','Bordeaux','Développeur en devenir chez OClock ',1),
('BaptisteF@gmail.com','tardis','explorer','https://www.thispersondoesnotexist.com/','Disponible','Développeur web','F','Baptiste','0685777460','Toulouse','Développeur en devenir chez OClock ',1),
('BlandineJ@gmail.com','blandine','Engrainons','https://www.thispersondoesnotexist.com/','Disponible','Développeur web','Tardis','Cédric','074558899','Sarcelles','Développeur en devenir chez OClock ',1);

INSERT INTO "project" ("name","is_available","description","need_of_the_project","beginning_date","icon","owner_id")
VALUES ('Devolution',true,'projet visant à aider les jeunes développeurs ainsi que les porteurs de projets ayant besoin de développeurs ou autre pour leur site','sur ce projet il faudra 1 back , 2 front de préférence connaissant React','2021-08-04', 'https://th.bing.com/th/id/OIP.D6scTJvoloTzPcbTHwXYGAAAAA?pid=ImgDet&rs=1',1),
('Notabebe',true,'Le projet est né à partir d’un constat simple d’une maman : le personnel de la crèche perd beaucoup trop de temps tout au long de la journée à noter des choses dans le cahier personnel de chaque enfant. Les parents n’ont pas accès à ce cahier chez eux le soir. 
    Tout cela pourrait être plus rapide, intuitif, et accessible tout au long de la journée par le parent. Donc même le soir. Et le parent pourra y ajouter des choses qui lui semblent importantes, à tout moment.
    ','1.    Front

    -    React
    -    React-router-dom
    -    Sass
    -    Semantic-UI / Material-UI
    
    2.    Back
    
    -    Node
    -    Express
    -    PostgreSQL
    -    Sqitch
    -    Joi
    -    Bcrypt
    -    Email-validator
    -    Fakerjs
    -    Nodemailer
    -    (Redis)','2021-10-09', 'https://ibb.co/R4ksbSG',7),
('Engrainons-nous',true,'Saviez-vous que plus de 80% des graines agricoles du monde sont la propriété des grands groupes industriels ? D’ailleurs celles-ci ne sont que très peu reproductibles.
    
    C’est pourquoi Engrainons-nous est née. C’est une plateforme d’échange de graines, libres de droits et reproductibles, dans le but de préserver la biodiversité semencière et potagère.
    
    Présentation générale du projet
    
    Objectifs du site 
    
    Permettre aux utilisateurs de la plateforme de s’échanger des graines :
    
    Permettre aux utilisateurs d’ajouter leur propres graines sur le site
    Permettre aux utilisateurs d’obtenir des informations sur les types de graines proposées sous forme de fiche détaillée
    Permettre aux utilisateurs de récupérer l’adresse email d’un utilisateur possédant les graines voulues.
    
    
    Public visé
    
    Toute personne ayant une volonté sincère dans la démarche éducative, d’entraide, d’échange, de la liberté de semer.','Graphisme et aspect visuel
    Des graphismes sobres mais élégants allant droit à l’essentiel
    Un thème de couleur vert
    Un logo représentant une graine
    Un site responsive pour tous supports (mobile first)
    Très probablement des animations dynamiques
    
    Contenu du site
    Des documents textes (fiche détaillé des graines)
    Des photos fournis par la bdd (unsplash / pexel)','06-09-2021','https://ibb.co/2hcdxCC',9),

    (
    'Dev Dojo', true,'Dev Dojo, un produit Pour les développeurs Web Junior / Senior / Reconversion / Bootcamp Qui ont besoin de chercher des ressources actuelles et de qualité car ils veulent apprendre de nouvelles choses et être entraîné aux meilleures techniques ninja du code pour restez à jour (Clean Code + Bonnes pratiques de développement -> Code maintenable et évolutif) Ils choisissent Dev Dojo car il permet d’apprendre des meilleurs Mentors de la Tech & booster leur carrière (employabilité) en un seul endroit (gain temps). Contrairement à Youtube, le site Dev Dojo a donc deux objectifs majeurs : -	Recenser les ressources du net pouvant participer à l’apprentissage d’un développeur, quel que soit son niveau, quel que soit le sujet, -	Permettre à des développeurs qui maîtrisent un sujet de créer du contenu pertinent et de proposer leur aide à des utilisateurs qui en feraient la demande. ',
    'FRONT : HTML, SCSS, JavaScript, React, Redux, Axios, React-router-dom, Sanitizer BACK : Node.js, Express, PostgresQL, Sqitch, Sequelize, Joi. AUTRE : Git, Socket.io, NPM, Faker',
    '2021-08-22T18:54:50.770Z',
    'https://ibb.co/C2yhgMM',
    5
    );

INSERT INTO "skill" ("label")
VALUES('React'),
('NodeJs'),
('Angular'),
('ThreeJS'),
('PostgreSQL'),
('MongoDB'),
('EJS'),
('Python'),
('Symfony'),
('CSS'),
('HTML'),
('Strapi'),
('Ruby'),
('Design');


INSERT INTO "user_participate_projects" ("user_id","project_id")
VALUES (1,1),
(2,2);

INSERT INTO "user_has_skills" ("user_id","skill_id")
VALUES (1,1),
(1,9),
(2,1),
(3,4),
(4,5),
(6,8),
(7,1),
(8,1),
(9,4),
(10,11),
(11,9),
(12,8),
(13,5),
(15,2),
(15,3),
(15,5),
(1,11);


COMMIT;


