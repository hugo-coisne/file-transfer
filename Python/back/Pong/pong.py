# -*- coding: utf-8 -*-
"""
Created on Fri Jul 23 09:48:21 2021

@author: hugo coisne
"""

import turtle
import winsound

wn = turtle.Screen()
wn.title("Pong by Hugo COISNE")
wn.bgcolor("black")
wn.setup(width=800,height=600)
wn.tracer(0)

#score
score_1 = 0
score_2 = 0

# Raquette 1
raquette_1 = turtle.Turtle()
raquette_1.speed(0)
raquette_1.shape("square")
raquette_1.color("white")
raquette_1.shapesize(stretch_wid=5, stretch_len=1)
raquette_1.penup()
raquette_1.goto(-350,0)

# Raquette 2
raquette_2 = turtle.Turtle()
raquette_2.speed(0)
raquette_2.shape("square")
raquette_2.color("white")
raquette_2.shapesize(stretch_wid=5, stretch_len=1)
raquette_2.penup()
raquette_2.goto(350,0)

# balle
balle = turtle.Turtle()
balle.speed(0)
balle.shape("square")
balle.color("white")
balle.penup()
balle.goto(0,0)
balle.dx = 0.1
balle.dy = 0.1

# pen
pen = turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write("Joueur 1 : 0  Joueur 2 : 0", align="center", font=("Courier", 24, "normal"))
# fonctions

def raquette_1_up():
    y = raquette_1.ycor()
    y += 20
    raquette_1.sety(y)

def raquette_1_down():
    y = raquette_1.ycor()
    y -= 20
    raquette_1.sety(y)

def raquette_2_up():
    y = raquette_2.ycor()
    y += 20
    raquette_2.sety(y)

def raquette_2_down():
    y = raquette_2.ycor()
    y -= 20
    raquette_2.sety(y)

# clavier
    
wn.listen()
wn.onkeypress(raquette_1_up,"z")
wn.onkeypress(raquette_1_down,"s")
wn.onkeypress(raquette_2_up,"Up")
wn.onkeypress(raquette_2_down,"Down")



# main game loop
while True :
    wn.update()
    
    #bouger la balle
    balle.setx(balle.xcor() + balle.dx)
    balle.sety(balle.ycor() + balle.dy)
    
    #collision bordures
    if balle.ycor() > 290 :
        balle.sety(290)
        balle.dy *=-1
        winsound.PlaySound("bounce.wav",winsound.SND_ASYNC)
        
    if balle.ycor() < -290 :
        balle.sety(-290)
        balle.dy *=-1
        winsound.PlaySound("bounce.wav",winsound.SND_ASYNC)
        
    if balle.xcor()>390:
        balle.goto(0, 0)
        balle.dx *=-1
        score_1 += 1
        pen.clear()
        pen.write("Joueur 1 : {}  Joueur 2 : {}".format(score_1,score_2), align="center", font=("Courier", 24, "normal"))
    
    if balle.xcor()<-390:
        balle.goto(0, 0)
        balle.dx *=-1
        score_2+=1
        pen.clear()
        pen.write("Joueur 1 : {}  Joueur 2 : {}".format(score_1,score_2), align="center", font=("Courier", 24, "normal"))
        
    #collision raquettes
    if (balle.xcor()> 340 and balle.xcor() <350 ) and (balle.ycor() < raquette_2.ycor()+40 and balle.ycor()> raquette_2.ycor()-40):
        balle.setx(340)
        balle.dx*=-1
        winsound.PlaySound("bounce.wav",winsound.SND_ASYNC)
        
    if (balle.xcor()<-340 and balle.xcor() >-350 ) and (balle.ycor() < raquette_1.ycor()+40 and balle.ycor()> raquette_1.ycor()-40):
        balle.setx(-340)
        balle.dx*=-1
        winsound.PlaySound("bounce.wav",winsound.SND_ASYNC)
        
        
        
        