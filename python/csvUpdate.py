import pandas as pd

file = "test.csv"

# read the CSV file train.csv
df = pd.read_csv(file)

# retailers
df.loc[df['store'] == 1, 'store'] = '6410098000a224e24ff4ff1e'
df.loc[df['store'] == 2, 'store'] = '642562233e5ea6cd00579d21'
df.loc[df['store'] == 3, 'store'] = '642562363e5ea6cd00579d26'
df.loc[df['store'] == 4, 'store'] = '6425623d3e5ea6cd00579d2b'
df.loc[df['store'] == 5, 'store'] = '6425624a3e5ea6cd00579d30'
df.loc[df['store'] == 6, 'store'] = '642562523e5ea6cd00579d35'
df.loc[df['store'] == 7, 'store'] = '642562573e5ea6cd00579d3a'
df.loc[df['store'] == 8, 'store'] = '6425625c3e5ea6cd00579d3f'
df.loc[df['store'] == 9, 'store'] = '642562623e5ea6cd00579d44'
df.loc[df['store'] == 10, 'store'] = '642562923e5ea6cd00579d4b'


# products
df.loc[df['item'] == 1, 'item'] = '640797292f845593a6eeb91e'
df.loc[df['item'] == 2, 'item'] = '641840174c7602e4344d3fe8'
df.loc[df['item'] == 3, 'item'] = '6418402e4c7602e4344d3fea'
df.loc[df['item'] == 4, 'item'] = '641840c74c7602e4344d3ff7'
df.loc[df['item'] == 5, 'item'] = '641840d94c7602e4344d3ff9'
df.loc[df['item'] == 6, 'item'] = '641840ed4c7602e4344d3ffb'
df.loc[df['item'] == 7, 'item'] = '641840ff4c7602e4344d3ffd'
df.loc[df['item'] == 8, 'item'] = '641841154c7602e4344d3fff'
df.loc[df['item'] == 9, 'item'] = '6418419b4c7602e4344d4001'
df.loc[df['item'] == 10, 'item'] = '641841b14c7602e4344d4003'

df.loc[df['item'] == 11, 'item'] = '641841bf4c7602e4344d4005'
df.loc[df['item'] == 12, 'item'] = '641841d04c7602e4344d4007'
df.loc[df['item'] == 13, 'item'] = '641841f74c7602e4344d4009'
df.loc[df['item'] == 14, 'item'] = '641842074c7602e4344d400b'
df.loc[df['item'] == 15, 'item'] = '641842144c7602e4344d400d'
df.loc[df['item'] == 16, 'item'] = '641842264c7602e4344d400f'
df.loc[df['item'] == 17, 'item'] = '641842604c7602e4344d4011'
df.loc[df['item'] == 18, 'item'] = '6418426f4c7602e4344d4013'
df.loc[df['item'] == 19, 'item'] = '6418427d4c7602e4344d4015'
df.loc[df['item'] == 20, 'item'] = '6418428d4c7602e4344d4017'

df.loc[df['item'] == 21, 'item'] = '641842e14c7602e4344d4019'
df.loc[df['item'] == 22, 'item'] = '641842f34c7602e4344d401b'
df.loc[df['item'] == 23, 'item'] = '641843034c7602e4344d401d'
df.loc[df['item'] == 24, 'item'] = '641843254c7602e4344d401f'
df.loc[df['item'] == 25, 'item'] = '641843334c7602e4344d4021'
df.loc[df['item'] == 26, 'item'] = '641843434c7602e4344d4023'
df.loc[df['item'] == 27, 'item'] = '641843524c7602e4344d4025'
df.loc[df['item'] == 28, 'item'] = '641843604c7602e4344d4027'
df.loc[df['item'] == 29, 'item'] = '641843734c7602e4344d4029'
df.loc[df['item'] == 30, 'item'] = '641844724c7602e4344d402d'

df.loc[df['item'] == 31, 'item'] = '641844904c7602e4344d4031'
df.loc[df['item'] == 32, 'item'] = '641844a84c7602e4344d4033'
df.loc[df['item'] == 33, 'item'] = '641844c54c7602e4344d4035'
df.loc[df['item'] == 34, 'item'] = '641844d24c7602e4344d4037'
df.loc[df['item'] == 35, 'item'] = '641844e14c7602e4344d4039'
df.loc[df['item'] == 36, 'item'] = '641845184c7602e4344d403b'
df.loc[df['item'] == 37, 'item'] = '641845434c7602e4344d4040'
df.loc[df['item'] == 38, 'item'] = '641845554c7602e4344d4042'
df.loc[df['item'] == 39, 'item'] = '6418456b4c7602e4344d4044'
df.loc[df['item'] == 40, 'item'] = '641845784c7602e4344d4046'

df.loc[df['item'] == 41, 'item'] = '641845c04c7602e4344d4048'
df.loc[df['item'] == 42, 'item'] = '641845e74c7602e4344d404a'
df.loc[df['item'] == 43, 'item'] = '641845f84c7602e4344d404c'
df.loc[df['item'] == 44, 'item'] = '641846074c7602e4344d404e'
df.loc[df['item'] == 45, 'item'] = '641846134c7602e4344d4050'
df.loc[df['item'] == 46, 'item'] = '641846244c7602e4344d4052'
df.loc[df['item'] == 47, 'item'] = '641846454c7602e4344d4054'
df.loc[df['item'] == 48, 'item'] = '642562363e5ea6cd00579d26'
df.loc[df['item'] == 49, 'item'] = '642562363e5ea6cd00579d26'
df.loc[df['item'] == 50, 'item'] = '642562363e5ea6cd00579d26'



# write the modified DataFrame to a new CSV file
df.to_csv(file, index=False)

print("done")


