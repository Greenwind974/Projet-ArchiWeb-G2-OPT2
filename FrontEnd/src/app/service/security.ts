import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class Security {

    
    private badChar : string[] = ['/', '*', '#', ':', ',', '{', '}', '[', ']']

  /**
   * Analyse le mot qu'on lui donne avec une liste de chaine de caractère interdite. 
   * Cette méthode permet d'avoir une couche de sécurité dans l'application
   * 
   * @param word 
   * @returns 
   */
  AnalyseWord(word : string) : boolean {
    let count : boolean = false;
    let iter : number = 0
    //Analyse la chaine pour savoir si un des éléments est présent dans le tableau de caractères interdit
    while(count == false && iter != this.badChar.length) {
      if(word.includes(this.badChar[iter-1])) count = true;
      iter++;
    }
    console.log("Connexion interdite : ",count)
    return count;
  }
}
