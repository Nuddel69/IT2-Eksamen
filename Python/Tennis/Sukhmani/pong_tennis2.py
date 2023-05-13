import pygame, sys, random

pygame.init()

WIDTH = 1280
HEIGHT = 720
FONT = pygame.font.SysFont("Calibri", int(WIDTH/20))
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))

CLOCK = pygame.time.Clock()

player = pygame.Rect(0, 0, 100, 10)
player.center = (WIDTH/2, HEIGHT-50)

player_score = 0

ball = pygame.Rect(0, 0, 20, 20)
ball.center = (WIDTH/2, HEIGHT/2)

x_speed, y_speed = 9,9
gravity = 0.034

bounce_obj = pygame.Rect(WIDTH/2-50, HEIGHT/2, 100, 10)

while True:
    keys_pressed = pygame.key.get_pressed()

    if keys_pressed[pygame.K_LEFT]:
        player.x -= 9
    
    if keys_pressed[pygame.K_RIGHT]:
        player.x += 9

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # ball movement
    if ball.colliderect(bounce_obj):
        y_speed = -y_speed

    if ball.y >= HEIGHT:
        ball.center = (WIDTH/2, HEIGHT/2)
        y_speed = -1
        player_score -= 1

    if ball.x >= WIDTH or ball.x <= 0:
        x_speed = -x_speed

    y_speed += gravity

     #top
    if ball.y <= 0:
        y_speed = 1

    ball.move_ip(x_speed, y_speed)

    # check for ball hitting paddle
    if player.colliderect(ball):
        y_speed = -y_speed
        player_score += 1

    # render objects on screen
    SCREEN.fill("black")
    pygame.draw.rect(SCREEN, "white", player)
    pygame.draw.rect(SCREEN, "white", bounce_obj)
    pygame.draw.circle(SCREEN, "white", ball.center, 10)
    player_score_text = FONT.render(str(player_score), True, "white")
    SCREEN.blit(player_score_text, (WIDTH/2+50, 50))

    pygame.display.update()
    CLOCK.tick(60)
