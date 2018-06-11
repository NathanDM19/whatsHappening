require 'test_helper'

class HappeningsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get happenings_create_url
    assert_response :success
  end

  test "should get new" do
    get happenings_new_url
    assert_response :success
  end

  test "should get index" do
    get happenings_index_url
    assert_response :success
  end

  test "should get show" do
    get happenings_show_url
    assert_response :success
  end

  test "should get edit" do
    get happenings_edit_url
    assert_response :success
  end

  test "should get update" do
    get happenings_update_url
    assert_response :success
  end

  test "should get destroy" do
    get happenings_destroy_url
    assert_response :success
  end

end
