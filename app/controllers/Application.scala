package controllers

import de.htwg.nich.minesweeper.control.impl.MineControl
import play.api.mvc._

object Application extends Controller {

  val gameController = new MineControl
  gameController.gameData.fieldSize = (2,5)

  def index = Action {
    Ok(views.html.index(gameController.gameData))
  }

  def handleClick(x:Int, y:Int) = Action {
    gameController.handleInput(1, x, y)
    Ok(views.html.index(gameController.gameData))
  }

  def newGame(name:String, x:Int, y:Int, mines:Int) = Action {
    gameController.newGame(name,x,y,mines)
    Ok(views.html.index(gameController.gameData))
  }

  def nix = Action {
    println("HURRAY")
    Ok(views.html.index(gameController.gameData))
  }

}