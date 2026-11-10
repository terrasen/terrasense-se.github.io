source "https://rubygems.org"

# GitHub Pages compatible Jekyll setup. Run with `bundle exec jekyll serve`.
gem "github-pages", group: :jekyll_plugins
gem "csv", "~> 3.3"
gem "bigdecimal", "~> 3.1"
gem "webrick", "~> 1.8"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
