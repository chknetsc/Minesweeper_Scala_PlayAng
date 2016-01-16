package controllers

import de.htwg.nich.minesweeper.control.impl.{NewGame, GameMessage, UpdatePosition, MineControl}
import play.api.mvc._

import scala.swing.Reactor

object Application extends Controller with Reactor {

  val gameController = new MineControl
  var canUpdate = false
  listenTo(gameController)

  def index = Action {
    val gameData = gameController.gameData
    Ok(views.html.index(gameData))
  }

  def handleClick(button:Int, x:Int, y:Int) = Action {
    println("Click Button " + button + ": " + x + "," + y)
    gameController.handleInput(button, x, y)
    waitForResult()
    val gameData = gameController.gameData
    Ok(views.html.index(gameData))
  }

  def newGame(name:String, x:Int, y:Int, mines:Int) = Action {
    gameController.newGame(name,x,y,mines)
    waitForResult()
    val gameData = gameController.gameData
    Ok(views.html.index(gameData))
  }

  // TODO Ersetzen durch Future
  def waitForResult() = {
    while (!canUpdate) {
      print(".")
    }
    canUpdate = false
    println("Result is there")

  }

  def update() =  {
    canUpdate = true
  }

  def endUpdate(message: String): Unit = {
    canUpdate = true
    println(message)
  }

  reactions += {
    case e: UpdatePosition =>
      println("Update")
      update()
    case e: GameMessage =>
      endUpdate(e.message)
    case e: NewGame =>
      println("New Game")
      update()
  }

}