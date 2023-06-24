import pygame, sys, os, random
from pygame.locals import *

FPS = 10 
fpsClock = pygame.time.Clock()
screen = pygame.display.set_mode((600,600), 0, 32)
pygame.display.set_caption('Snake')

os.chdir("Old")
image  = pygame.image.load('image.png')
image2 = pygame.image.load('image2.png')

direction = 'right'
d=30
k=["right"]*2
coord=[30*i for i in range(20)]

class Block:
    def __init__(self, x, y, image=image):
        self.x=x
        self.y=y
        self.image=image


class Bonus(Block):
    def __init__(self, x, y, image=image2):
        super().__init__(x,y,image)
        

snake=[Block(60, 240)]
bonus=Bonus(540,240)

while True:
    screen.fill((0,0,0))
    
    for event in pygame.event.get():
        if event.type == QUIT:
            print(k)
            pygame.quit()
            sys.exit()
        if event.type==KEYDOWN:
            k += [pygame.key.name(event.key)]
            break
            
    if k[-1]=="up" and (k[-2]=="left" or k[-2]=="right"):
        direction = k[-1]
    elif k[-1]=="down" and (k[-2]=="left" or k[-2]=="right"):
        direction = k[-1]        
    elif k[-1]=="right" and (k[-2]=="up" or k[-2]=="down"):
        direction = k[-1]
    elif k[-1]=="left" and (k[-2]=="up" or k[-2]=="down"):
        direction = k[-1]
        
        
    save=Block(snake[-1].x,snake[-1].y)
    
    if direction == 'right':
        snake[-1].x,snake[-1].y = snake[0].x+d,snake[0].y
    elif direction == 'down':
        snake[-1].y,snake[-1].x = snake[0].y+d,snake[0].x
    elif direction == 'left':
        snake[-1].x,snake[-1].y = snake[0].x-d,snake[0].y
    elif direction == 'up':
        snake[-1].y,snake[-1].x = snake[0].y-d,snake[0].x
    
     
    snake=[snake[-1]]+snake[:-1]
    
    if (snake[0].x, snake[0].y)==(bonus.x, bonus.y):
        snake+=[save]
        ok=True
        while ok:
            r1,r2=random.choice(coord),random.choice(coord)
            if (r1, r2) not in [(i.x,i.y) for i in snake]:
                ok=False
                bonus.x,bonus.y=r1,r2
   
        
    if snake[0].x<0 or snake[0].x>570 or snake[0].y<0 or snake[0].y>570 or ((snake[0].x,snake[0].y) in [(i.x,i.y) for i in snake[1:]]):
        pygame.quit()
        sys.exit()
    
    for i in range(len(snake)):    
        screen.blit(snake[i].image, (snake[i].x, snake[i].y))
    
    screen.blit(bonus.image, (bonus.x, bonus.y))
    
    pygame.display.update()
    fpsClock.tick(FPS)