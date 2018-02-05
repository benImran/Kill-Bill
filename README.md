Introduction du projet Kill-Bill : 

Pour installer le projet sur MAC il faut au préalable :<br>
  1. Avoir xCode. <br>
        - Ouvrir le terminal et taper la commande "$ xcode-select -p" afin de vérifier si vous disposez de xCode.<br>
        Si vous avez déjà installé xCode, le terminal vous dira "/Applications/Xcode.app/Contents/Developer".

        - Si xCode n'est pas installé, ouvré soit l'application "Apple Store" ou aller sur le site d'apple pour le télécharger.
        Enfin aller dans le terminal et vérifier si vous a avez Command Line Tools d'installé.
        Taper $ gcc afin de vérifier.
    
        - Un message d'alerte vous proposera d'installer Command Line Tools.
        Sinon taper $ xcode-select --install

     - Si vous disposez des Command Line Tools taper $ xcode-select -p le terminal renverra
      /Library/Developer/CommandLineTools

   2. Créer son dossier, ouvrir le terminal (Mac).

     - Ouvrir son terminal
     - Créer un dossier, aller dans le dossier via le terminal $ cd/...<br>
        Sinon glisser le dossier dans le terminal pour être directement dedans.
        
    - Faire un $ git clone https://github.com/benImran/hetic-w2-p2019-13.git

3. Enfin aller dans le dossier cloné, tapper dans le terminal : <br> 
    
    $ Git status<br>
        Pour aller sur la branche de développement : <br> 
    $ git checkout -b dev
        Vous ête donc dans la branch de développement.<br>
    Effectué : <br>
    $ git pull origin master
   
    Vous avez le projet sur votre branch dev pour travailler.
    
Link : https://vinyl-killbill.netlify.com/

Deployed : gulp build
