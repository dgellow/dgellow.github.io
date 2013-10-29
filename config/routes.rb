WebpCh::Application.routes.draw do
  root to: 'static_contents#home', via: [:get]
end
