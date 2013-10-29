json.array!(@static_contents) do |static_content|
  json.extract! static_content, 
  json.url static_content_url(static_content, format: :json)
end