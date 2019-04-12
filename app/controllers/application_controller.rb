class ApplicationController < ActionController::API
  before_action :authenticate 

  def logged_in?
    !!current_user
  end

  def current_user
    if auth_present?
      @curent_user ||= User.find_by_id(auth["userId"])
    end
  end

  def authenticate
    render json: {error: "unauthorized"}, status: 401 unless logged_in?
  end

  private

  def token
    request.authorization
  end

  def auth
    Auth.decode(token)
  end

  def auth_present?
    !!request.authorization
  end
end