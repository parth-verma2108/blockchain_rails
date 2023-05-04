# frozen_string_literal: true

module UuidShortener
  ALPHABET = %w[0 1 2 3 4 5 6 7 8 9
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
              a b c d e f g h i j k l m n o p q r s t u v w x y z
              - _].freeze

  def self.short_id(id)
    new_short_id = id.split('-').join
    new_short_id = new_short_id.chars.map { |c| c.hex.to_s(2).rjust(4,'0') }.join
    new_short_id = new_short_id.prepend("0000")
    new_short_id = new_short_id.scan(/.{6}/)
    new_short_id = new_short_id.map { |x| x.to_i(2) }
    new_short_id = new_short_id.map { |x| ALPHABET[x] }
    new_short_id.join
  end
end
