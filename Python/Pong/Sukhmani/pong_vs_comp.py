import pygame, sys, random
pygame.init()
WIDTH = 1200
HEIGHT = 720
skrifttype = pygame.font.SysFont("Calibri", int(WIDTH/20))

SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
FONT = pygame.display.set_caption("Pong!")

CLOCK = pygame.time.Clock()

# Paddles

player = pygame.Rect(0, 0, 10, 100)
player.center = (WIDTH-100, HEIGHT/2)

opponent = pygame.Rect(0, 0, 10, 100)
opponent.center = (100, HEIGHT/2)

spiller_score, opponent_score = 0, 0

# Ball

ball = pygame.Rect(0, 0, 20, 20)
ball.center = (WIDTH/2, HEIGHT/2)

x_speed, y_speed = 0.5, 0.5

while True:
    keys_pressed = pygame.key.get_pressed()

    if keys_pressed[pygame.K_UP]:
        if player.top > 0:
            player.top -= 2
    if keys_pressed[pygame.K_DOWN]:
        if player.bottom < HEIGHT:
            player.bottom += 2

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    if ball.y >= HEIGHT:
        y_speed = -1
    if ball.y <= 0:
        y_speed = 1
    if ball.x <= 0:
        spiller_score += 1
        ball.center = (WIDTH/2, HEIGHT/2)
        x_speed, y_speed = random.choice([1, -1]), random.choice([1, -1])
    if ball.x >= WIDTH:
        opponent_score += 1
        ball.center = (WIDTH/2, HEIGHT/2)
        x_speed, y_speed = random.choice([1, -1]), random.choice([1, -1])

    if player.x + player.width >= ball.x >= player.left and ball.y in range(player.top-player.width, player.bottom+player.width):
        x_speed = -1
    if opponent.x - ball.width <= ball.x <= opponent.right and ball.y in range(opponent.top-ball.width, opponent.bottom+ball.width):
        x_speed = 1

    spiller_score_text = skrifttype.render(str(spiller_score), True, "white")
    opponent_score_text = skrifttype.render(str(opponent_score), True, "white")

    if opponent.y < ball.y:
        opponent.top += 1
    if opponent.bottom > ball.y:
        opponent.bottom -= 1

    ball.x += x_speed * 2
    ball.y += y_speed * 2

    SCREEN.fill("Black")

    pygame.draw.rect(SCREEN, "white", player)
    pygame.draw.rect(SCREEN, "white", opponent)
    pygame.draw.circle(SCREEN, "white", ball.center, 10)

    SCREEN.blit(spiller_score_text, (WIDTH/2+50, 50))
    SCREEN.blit(opponent_score_text, (WIDTH/2-50, 50))

    pygame.display.update()
    CLOCK.tick(300)