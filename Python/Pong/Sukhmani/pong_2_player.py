import pygame, sys, random
pygame.init()
WIDTH = 1280
HEIGHT = 720
FONT = pygame.font.SysFont("Calibri", int(WIDTH/20))

SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong!")

CLOCK = pygame.time.Clock()

# Paddles

player1 = pygame.Rect(0, 0, 10, 100)
player1.center = (100, HEIGHT/2)

player2 = pygame.Rect(0, 0, 10, 100)
player2.center = (WIDTH-100, HEIGHT/2)

player1_score, player2_score = 0,0

# Ball

ball = pygame.Rect(0, 0, 20, 20)
ball.center = (WIDTH/2, HEIGHT/2)

x_speed, y_speed = 1, 1

while True:
    keys_pressed = pygame.key.get_pressed()

    if keys_pressed[pygame.K_w]:
        if player1.top > 0:
            player1.top -= 2
    if keys_pressed[pygame.K_s]:
        if player1.bottom < HEIGHT:
            player1.bottom += 2
    
    if keys_pressed[pygame.K_UP]:
        if player2.top > 0:
            player2.top -= 2
    if keys_pressed[pygame.K_DOWN]:
        if player2.bottom < HEIGHT:
            player2.bottom += 2


    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    if ball.y >= HEIGHT:
        y_speed = -1
    if ball.y <= 0:
        y_speed = 1



    if ball.x <= 0:
        player2_score += 1
        ball.center = (WIDTH/2, HEIGHT/2)
        x_speed, y_speed = random.choice([1, -1]), random.choice([1, -1])
    
    
    if ball.x >= WIDTH:
        player1_score += 1
        ball.center = (WIDTH/2, HEIGHT/2)
        x_speed, y_speed = random.choice([1, -1]), random.choice([1, -1])
    
    
    if player1.x + player1.width >= ball.x >= player1.left and ball.y in range(player1.top-player1.width, player1.bottom+player1.width):
        x_speed = 1


    if player2.x - ball.width <= ball.x <= player2.right and ball.y in range(player2.top-ball.width, player2.bottom+ball.width):
        x_speed = -1

    player1_score_text = FONT.render(str(player1_score), True, "white")
    player2_score_text = FONT.render(str(player2_score), True, "white")

    ball.x += x_speed * 2
    ball.y += y_speed * 2

    SCREEN.fill("Black")

    pygame.draw.rect(SCREEN, "white", player1)
    pygame.draw.rect(SCREEN, "white", player2)
    pygame.draw.circle(SCREEN, "white", ball.center, 10)

    SCREEN.blit(player1_score_text, (WIDTH/2+50, 50))
    SCREEN.blit(player2_score_text, (WIDTH/2-50, 50))

    pygame.display.update()
    CLOCK.tick(300)


