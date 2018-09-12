<template>
  <div>
    <nav class="navbar is-info">
      <!-- navbar brand, navbar menu... -->
      <div class="navbar-start">
        <a class="navbar-item">
          MOSE
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              Home
            </p>
            <p class="control">
              About
            </p>
            <p class="control">
              Features
            </p>
            <p class="control">
              About us
            </p>
          </div>
        </div>
      </div>
    </nav>
    <div class="column is-one-fifth">
      <aside class="menu">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
          </div>
        </div>
        <ul class="menu-list gray">
          <li><a>Dashboard</a></li>
          <li><a>Tables</a></li>
          <li><a>Charts</a></li>
          <li><a>Calendar</a></li>
          <li><a>Users</a></li>
          <li></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.gray {
  background: #778899;
  padding-bottom: 250px
}
</style>
