<template>
    <div class="game">
        <div class="game-item-header">
            <div class="game-title">
                Game Title A
                <span class="game-auther">
                    by Dev #1
                </span>
            </div>
            <div class="game-scores"># scores submitted: 6103</div>
        </div>
        <div class="game-item-body">
            <div class="game-thumbnail">
                <img src="https://placehold.co/600x400" alt="game thumbnail">
            </div>
            <div clsas="game-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempore nam architecto incidunt similique
                adipisci suscipit, placeat minima voluptas officia enim error assumenda in, iusto tenetur quaerat ab,
                perferendis doloremque.
            </div>
        </div>
    </div>
</template>

<style scoped>
.game {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;

    position: relative;
}

.game-title {
    font-size: 1.25rem;
}

.game-auther {
    font-size: .875rem;
}

.game-scores {
    font-size: smaller;

    position: absolute;
    top: 1rem;
    right: 1rem;
}

.game-item-body {
    display: flex;
    gap: 0 .5rem;
    margin-top: .5rem;
}

.game-thumbnail {
    flex: 0 0 30%;
}

.game-thumbnail img {
    max-width: 100%;
}
</style>