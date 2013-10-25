# Be sure to restart your server when you modify this file.

# Filename: config/initializers/secret_token.rb

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly, such as by adding
# .secret to your .gitignore file.

require 'securerandom'

def secure_token
  token_file = Rails.root.join('.secret')
  if File.exist?(token_file)
    # Use the existing token.
    File.read(token_file).chomp
  else
    # Generate a new token and store it in token_file.
    token = SecureRandom.hex(64)
    File.write(token_file, token)
    token
  end
end

webp-ch::Application.config.secret_key_base = secure_token
