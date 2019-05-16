require 'jwt'

class Auth

  ALGORITHM = 'HS256'
  
  def self.issue(payload)
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM)
  end

  def self.decode(token)
    JWT.decode(token, 
      auth_secret, 
      true, 
      { algorithm: ALGORITHM }).first
  end

  def self.auth_secret
    # https://medium.com/cedarcode/rails-5-2-credentials-9b3324851336
    Rails.application.credentials.secret_key_base
  end
end