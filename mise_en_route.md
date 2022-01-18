# Etapes pour mettre en place la BDD

## PostgreSQL 13

Avoir PostgreSQL 13 sur son ordinateur

Fiches récaps Kourou :

   - PostGreSQL : https://kourou.oclock.io/ressources/fiche-recap/postgresql/#cr%c3%a9er-un-utilisateur
   - Rôles PostgreSQL : https://kourou.oclock.io/ressources/fiche-recap/roles-postgresql/
   - Le langage SQL : https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/sql.md

## psql

0. Lancer PostGreSQL
   ```bash
      sudo -i -u postgres (ou 'sudo su postgres' sur MacOsX)

   ```

1. Puis la commande
   ```bash
      psql
   ```


2. Créer un utilisateur
   ```bash
   CREATE ROLE nomDeLutilisateur WITH LOGIN PASSWORD 'leMotDePasse';
   ```
3. Créer une base de données
   ```bash
   CREATE DATABASE nomDeLaBase OWNER nomDeLutilisateur;
   ```

4. Inséré les fakes données en BDD

   Depuis un nouveau terminal
   ```bash
   psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql
   ```
   Ou de façon plus bourrine copier/coller les instrutions dans le fichier .sql directement dans le terminal avec votre user PostGres connecté
    ```bash
   dev_database-> 'coller ici'
   ```